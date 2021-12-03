from django.db import models
from django.db.models import FileField
from django.db.models.signals import post_delete
from django.dispatch import receiver





class News(models.Model):
    header=models.CharField(max_length=50)
    description=models.TextField(max_length=1500)
    main_image=models.FileField(default="",null=True, upload_to="images/main")
    date=models.DateTimeField()


    def delete(self):
        self.main_image.storage.delete(self.main_image.name)
        NewsFile.objects.filter(news=self).delete()
        super().delete()
    

    def __str__(self):
        return self.header


    class Meta:
        verbose_name = "News"
        verbose_name_plural = "News"



class NewsFile(models.Model):
    file = models.FileField(null=True, upload_to="images/rest")
    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name='files')

    
    def __str__(self):
        return f"file id: {self.id} - name: {self.file.name}"


@receiver(post_delete, sender=NewsFile)
def my_function_post_delete(sender, instance, **kwargs):
    instance.file.storage.delete(instance.file.name)



post_delete.connect(my_function_post_delete, sender=NewsFile)


