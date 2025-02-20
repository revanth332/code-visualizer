# Code Flow Visualizer

This tool visualizes Python code execution flow, focusing on conditions and loops, using React Flow. It also supports generating Python code from a React Flow diagram. This tool does _not_ visualize function definitions; it focuses only on the flow related to conditional statements and loops within the provided code.

## Capabilities

### 1. Code Visualization:
- **Input**: Python code.
- **Output**: React Flow JSON data (nodes and edges) representing the code's control flow.
- **Visual Elements**:
  - **Nodes**: Represent code blocks, conditions, loop iterations, etc.
  - **Edges**: Show the execution path between nodes.
  - Loops are specially marked in the node data with `"isLoop": true`.

### 2. Code Generation:
- **Input**: React Flow JSON data (nodes and edges).
- **Output**: Python code that matches the provided flow diagram.

## Usage

### 1. Code to Flow Diagram:
Provide your Python code as input. The tool will generate a JSON object containing `nodes` and `edges` arrays, ready to be used with React Flow.

**Example Input (Python Code)**:
```python
num1 = input()
num2 = input()

if num1 > num2:
    print(num1)
else:
    print(num2)

