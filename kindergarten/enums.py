from enum import Enum

class GroupType(Enum):
    YOUNGERS = "YOUNGERS",
    MIDDLES = "MIDDLES",
    OLDERS = "OLDERS",

    @classmethod
    def choices(cls):
        return [(key.name, key.value[0]) for key in cls]