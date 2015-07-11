import sys


class Interpreter(object):

    def __init__(self, filename, n=5000):
        with open(filename, 'r') as f:
            self.text = self.strip(f.read())
        self.data = [0 for x in range(n)]  # not infinite but that's OK
        self.dp = 0  # data pointer
        self.cp = 0  # code pointer
        self.jump = [None for x in range(n)] #  keeps track where to jump to in loops
        self.loop_track(self.text)

    def loop_track(self, text):
        stack = []
        for i, char in enumerate(text):
            if char == '[':
                stack.append(i)
            elif char == ']':
                self.jump[i] = stack.pop()
                self.jump[self.jump[i]] = i

    def strip(self, text):
        # remove all whitespace and non-keyword characters
        allowed = '<>-+.,[]'
        return ''.join([x for x in text if x in allowed])

    def increment(self):
        self.data[self.dp] += 1

    def decrement(self):
        self.data[self.dp] -= 1
    
    def move_left(self):
        self.dp -= 1

    def move_right(self):
        self.dp += 1

    def print_char(self):
        sys.stdout.write(chr(self.data[self.dp]))

    def input_char(self):
        self.data[self.dp] = ord(sys.stdin.read(1))

    def jump_to(self):
        self.cp = self.jump[self.cp]

    def eval(self):
        while self.cp < len(self.text) - 1:
            char = self.text[self.cp]
            current_value = self.data[self.dp]
            if char == '+':
                self.increment()
            elif char == '-':
                self.decrement()
            elif char == '>':
                self.move_right()
            elif char == '<':
                self.move_left()
            elif char == '.':
                self.print_char()
            elif char == ',':
                self.input_char()
            elif char == '[' and current_value == 0:
                self.jump_to()
            elif char == ']' and current_value != 0:
                self.jump_to()
            self.cp += 1

if __name__ == '__main__':
    filename = sys.argv[1]
    bf = Interpreter(filename)
    bf.eval()
