#!/usr/bin/env python
from __future__ import print_function

class Node:
    def __init__(self, key, parent_node, content_holder):
        self.key = key
        self.parent = parent_node
        self.children = []
        self.content_holder = content_holder

    def add_child(self, child):
        self.children.append(child)

    def show(self):
        for child in self.children:
            child.show()

    def render(self, mapping, rendering_function=None):
        content = ""
        for child in self.children:
            placeholder = child.render(mapping, rendering_function)
            if placeholder is None:
                self = None
                return
            else:
                content += placeholder
            
        value = mapping.get(self.key, None)
        if value is None:
            raise ValueError(f'The value "{self.key}" could not be found ')
            self = None
            return None
        if rendering_function is not None:
            value = rendering_function(self.key, value)

        if len(self.children) != 0:
            value = value.replace(self.content_holder, content)

        return value

    def __str__(self):
        return f'key: {self.key} ch: {self.content_holder} {self.parent} {self.children}'

def print_children(node):
    print(f'curr node val: {node.key}')
    for child in node.children:
        print_children(child)