from django.db import models
from .enums import GroupType



class Group(models.Model):

    teacher = models.OneToOneField("users.User", on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=30)
    type = models.CharField(max_length=255, choices=GroupType.choices(), default=GroupType.YOUNGERS.value[0])

    objects = models.Manager()

    def __str__(self):
        return self.name




class Announcement(models.Model):

    group = models.ForeignKey(Group, on_delete=models.CASCADE, blank=True, null=True)
    text = models.TextField(blank=True)
    date = models.DateField(blank=True, null=True, editable=True)
    is_for_all = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return self.text




class Child(models.Model):

    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=50)
    gender = models.CharField(max_length=10, choices=[("M","MALE"),("F","FEMALE")], default="M")
    date_of_birth = models.DateField()
    pesel = models.CharField(max_length=11, unique=True)
    eats_breakfast = models.BooleanField(default=False)
    eats_dinner = models.BooleanField(default=False)
    eats_supper = models.BooleanField(default=False)
    street = models.CharField(max_length=50)
    house_number = models.CharField(max_length=10)
    city = models.CharField(max_length=50)
    coming_hour = models.TimeField()
    leaving_hour = models.TimeField()
    sicknesses = models.TextField(max_length=200, null=True, blank=True, default="")
    additional_info=models.TextField(max_length=200, null=True, blank=True, default="")
    parent_one = models.CharField(max_length=50, default="")
    parent_two = models.CharField(max_length=50, default="")
    authorized_person_one = models.CharField(max_length=50, null=True, blank=True, default="")
    authorized_person_two = models.CharField(max_length=50, null=True, blank=True, default="")

    objects = models.Manager()

    class Meta:
        verbose_name = "Child"
        verbose_name_plural = "Children"

    def __str__(self):
        return f'{self.name} {self.surname}'




class Attendance(models.Model):

    child = models.ForeignKey(Child, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    hours = models.IntegerField(verbose_name="Hours in kindergarten")
    info = models.TextField(max_length=200)

    objects = models.Manager()

    def __str__(self):
        return f"Attendance {self.id}"








