# events/management/commands/update_zero_prices.py

import random
from django.core.management.base import BaseCommand
from events.models import Event

class Command(BaseCommand):
    help = (
        "Find all events whose price is zero and set them to a random "
        "price between --min and --max."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--min", type=float, default=10.0,
            help="Minimum random price (default: 10.0)"
        )
        parser.add_argument(
            "--max", type=float, default=100.0,
            help="Maximum random price (default: 100.0)"
        )

    def handle(self, *args, **options):
        min_price = options["min"]
        max_price = options["max"]
        qs = Event.objects.filter(price=0)
        total = qs.count()
        if total == 0:
            self.stdout.write(self.style.WARNING("No events with price=0 found."))
            return

        self.stdout.write(f"🎫 Updating {total} events (price=0) → random price in [{min_price}, {max_price}]")

        for event in qs:
            new_price = round(random.uniform(min_price, max_price), 2)
            event.price = new_price
            event.save(update_fields=["price"])
            self.stdout.write(f"  • #{event.id} {event.title!r}: ${new_price}")

        self.stdout.write(self.style.SUCCESS("✅ All zero-price events updated."))
