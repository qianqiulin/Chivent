from django.test import TestCase
from .models import Event
from django.utils import timezone
from decimal import Decimal

class EventModelTest(TestCase):
    def setUp(self):
        # runs before each test
        self.event = Event.objects.create(
            title='Sample Event',
            description='Just a test event',
            image_url='https://example.com/img.png',
            price=Decimal('19.99'),
            location='Testville',
            start_time=timezone.now(),
            end_time=timezone.now() + timezone.timedelta(hours=2),
        )

    def test_str_returns_title(self):
        """__str__() should return the event's title."""
        self.assertEqual(str(self.event), 'Sample Event')

    def test_create_event_increments_count(self):
        """Creating a second event should increase the count."""
        before = Event.objects.count()
        Event.objects.create(
            title='Another',
            description='Second event',
            image_url='https://example.com/2.png',
            price=Decimal('5.00'),
            location='Elsewhere',
            start_time=timezone.now(),
            end_time=timezone.now() + timezone.timedelta(hours=1),
        )
        self.assertEqual(Event.objects.count(), before + 1)

    def test_update_event_changes_value(self):
        """Updating the title and saving should persist to the DB."""
        self.event.title = 'Updated Title'
        self.event.save()

        # re-fetch from database
        refreshed = Event.objects.get(pk=self.event.pk)
        self.assertEqual(refreshed.title, 'Updated Title')

    def test_delete_event_reduces_count(self):
        """Deleting an event should remove it from the DB."""
        pk = self.event.pk
        self.event.delete()
        with self.assertRaises(Event.DoesNotExist):
            Event.objects.get(pk=pk)
