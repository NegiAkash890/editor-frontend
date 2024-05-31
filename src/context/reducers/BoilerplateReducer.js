const cppBoilerCode = `#include<bits/stdc++.h>
using namespace std;
int main(){
    //Input the code here
    return 0;
}`;

const javaBoilerCode = `import java.util.*;
import java.lang.*;
import java.io.*;
/* Name of the class has to be "Main" only if the class is public. */
class Main
{
    public static void main (String[] args) throws java.lang.Exception
    {
        // Input the code here
    }
}`;

// eslint-disable-next-line quotes
const pythonBoilerCode = `# Python code Here \n
print('Hello world')`;

const javascriptBoilerCode = `// Javascript code Here \n
console.log('Hello world')`;

const BoilerplateReducer = (prevCode, { type }) => {
  switch (type) {
    case 'CPP':
      return cppBoilerCode;
    case 'PYTHON':
      return pythonBoilerCode;
    case 'JAVA':
      return javaBoilerCode;
    case 'JAVASCRIPT':
      return javascriptBoilerCode;
    default:
      return cppBoilerCode;
  }
};

export default BoilerplateReducer;
