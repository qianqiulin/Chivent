import os
import datetime as dt

from django.core.management.base import BaseCommand
from django.utils import timezone
from dateutil import parser as date_parser

from serpapi import GoogleSearch
from events.models import Event

class Command(BaseCommand):
    help = "Fetch events in Chicago via SerpAPI and upsert them into the DB"

    def add_arguments(self, parser):
        parser.add_argument(
            "--num", type=int, default=10,
            help="How many results to fetch per page (default: 50)"
        )
        parser.add_argument(
            "--pages", type=int, default=5,
            help="How many pages to loop through (default: 1)"
        )

    def handle(self, *args, **options):
        api_key = "279445261754ab6404151bbef1cecf125614a75f3417d646a85a591f80f9a1f3"
        if not api_key:
            self.stderr.write(self.style.ERROR(
                "❌ Please set SERPAPI_API_KEY in your environment."))
            return

        num    = options["num"]
        pages  = options["pages"]

        # 0) Purge any leftover 'Test' rows
        deleted, _ = Event.objects.filter(title="Test").delete()
        if deleted:
            self.stdout.write(self.style.WARNING(f"🗑  Deleted {deleted} Test events."))

        created = updated = 0

        for page in range(pages):
            params = {
                "engine":    "google_events",
                "q":         "Events in Chicago",
                "hl":        "en",
                "gl":        "us",
                "api_key":   api_key,
                "num":       num,
                "start":     page * num,
            }
            results = GoogleSearch(params).get_dict()
            events  = results.get("events_results", [])

            for item in events:
                title       = item.get("title", "").strip()
                description = item.get("description", "").strip()
                image_url   = item.get("thumbnail") or ""
                location    = ", ".join(item.get("address", []))

                date_info = item.get("date", {})
                when_str  = date_info.get("when", "")
                start_date_str = date_info.get("start_date", "")

                # default times
                now = timezone.now()
                start_time = now
                end_time   = now + dt.timedelta(hours=2)

                # 1) try parsing the 'when' string via dateutil
                try:
                    # if it's a single datetime (e.g. "Jun 5, 7 PM")
                    if " – " not in when_str:
                        dt_obj = date_parser.parse(when_str, default=now)
                        start_time = timezone.make_aware(dt_obj)
                        end_time   = start_time + dt.timedelta(hours=2)
                    else:
                        # it's a range: "Jun 5 – 7 PM" or "Jun 5 – Jun 7"
                        start_part, end_part = [p.strip() for p in when_str.split("–", 1)]
                        dt_start = date_parser.parse(start_part, default=now)
                        dt_end   = date_parser.parse(end_part, default=dt_start)
                        start_time = timezone.make_aware(dt_start)
                        end_time   = timezone.make_aware(dt_end)
                except Exception:
                    # fallback: parse just the start_date
                    try:
                        dt_start = date_parser.parse(start_date_str + f" {now.year}")
                        start_time = timezone.make_aware(dt_start)
                        end_time   = start_time + dt.timedelta(hours=2)
                    except:
                        pass

                price = 0.00

                obj, created_flag = Event.objects.update_or_create(
                    title=title,
                    defaults={
                        "description": description,
                        "image_url":   image_url,
                        "location":    location,
                        "start_time":  start_time,
                        "end_time":    end_time,
                        "price":       price,
                    }
                )
                if created_flag:
                    created += 1
                else:
                    updated += 1

        self.stdout.write(self.style.SUCCESS(
            f"✅ Import complete: {created} created, {updated} updated."
        ))
