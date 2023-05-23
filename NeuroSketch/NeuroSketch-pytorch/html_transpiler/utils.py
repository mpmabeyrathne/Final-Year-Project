import string
import random


class Utils:
    @staticmethod
    def get_random_text(length_text=10, space_number=1, with_upper_case=True):
        results = []
        while len(results) < length_text:
            char = random.choice(string.ascii_letters[:26])
            results.append(char)
        if with_upper_case:
            results[0] = results[0].upper()

        current_spaces = []
        while len(current_spaces) < space_number:
            space_pos = random.randint(2, length_text - 3)
            if space_pos in current_spaces:
                break
            results[space_pos] = " "
            if with_upper_case:
                results[space_pos + 1] = results[space_pos - 1].upper()

            current_spaces.append(space_pos)

        return ''.join(results)

    @staticmethod
    def render_content_with_text(key, value):
        FILL_WITH_RANDOM_TEXT = True
        TEXT_PLACE_HOLDER = "[]"

        if FILL_WITH_RANDOM_TEXT:
            if key.find("button") != -1:
                value = value.replace(TEXT_PLACE_HOLDER, 'Button')
            elif key.find("Heading") != -1:
                value = value.replace(TEXT_PLACE_HOLDER, 'Title')
            elif key.find("Paragraph") != -1:
                value = value.replace(TEXT_PLACE_HOLDER,'text')
            elif key.find("label") != -1:
                value = value.replace(TEXT_PLACE_HOLDER,'text')
            elif key.find("image") != -1:
                value = value.replace(TEXT_PLACE_HOLDER,'text')
            elif key.find("select-box") != -1:
                value = value.replace(TEXT_PLACE_HOLDER,'text')
            elif key.find("check-box") != -1:
                value = value.replace(TEXT_PLACE_HOLDER,'text')
            elif key.find("radio-button") != -1:
                value = value.replace(TEXT_PLACE_HOLDER,'text')
            elif key.find("input-text") != -1:
                value = value.replace(TEXT_PLACE_HOLDER,'text')
        return value
