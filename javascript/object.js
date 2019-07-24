
var Person = function(name, age){
    this.name = name;
    this.age = age;
    this.canTalk = true;
}

Person.prototype.greet = function(){
    if (this.canTalk){
        console.log('Hi, I am ' + this.name);
    }
}

function init(){
    var dave = new Person("dave", 21);
    dave.greet();
}