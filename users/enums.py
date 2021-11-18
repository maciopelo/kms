from enum import Enum

class UserType(Enum):
    HEADMASTER = "HEADMASTER",
    TEACHER = "TEACHER",
    PARENT = "PARENT",

    @classmethod
    def choices(cls):
        return [(key.name, key.value[0]) for key in cls]
