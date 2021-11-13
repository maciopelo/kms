from django.test import TestCase

# Create your tests here.

class FirstTests(TestCase):

    def test(self):
        self.assertIs(True,True)