export default function language(state={data:`#include<bits/stdc++.h>
using namespace std;
int main(){
    //Input the code here
}`},action){
    let newVal;
    switch(action.type){
        case "cpp":
            newVal = `#include<bits/stdc++.h>
using namespace std;
int main(){
    //Input the code here
}`;
            return {...state,data:newVal};
        case "java":
            newVal = `import java.util.*;
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
            return {...state,data:newVal};
        case "python":
            newVal=`#Input the code here`;
            return {...state,data:newVal};
        default : 
            return state;
    }
};