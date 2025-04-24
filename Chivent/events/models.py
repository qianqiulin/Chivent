from django.db import models

class Event(models.Model):
    title       = models.CharField(max_length=200)
    description = models.TextField()
    image_url   = models.URLField()        # you can host images elsewhere
    price       = models.DecimalField(max_digits=7, decimal_places=2)
    location    = models.CharField(max_length=200)
    start_time  = models.DateTimeField()
    end_time    = models.DateTimeField()

    def __str__(self):
        return self.title
