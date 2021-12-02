from django.db import models

class News(models.Model):
    header=models.CharField(max_length=50)
    description=models.TextField(max_length=1500)
    main_image=models.FileField(default="",null=True, upload_to="images/main")
    date=models.DateTimeField()


    def delete(self, using=None, keep_parents=False):
        self.main_image.storage.delete(self.main_image.name)
        super().delete()
    

    def __str__(self):
        return self.header


    class Meta:
        verbose_name = "News"
        verbose_name_plural = "News"



class NewsFile(models.Model):
    file = models.FileField(null=True, upload_to="images/rest")
    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name='files')

    def delete(self, using=None, keep_parents=False):
        self.file.storage.delete(self.file.name)
        super().delete()

    
    def __str__(self):
        return f"file id: {self.id} - name: {self.file.name}"

