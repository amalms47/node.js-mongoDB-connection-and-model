const mongo=require('mongoose');

//MongoDB connection 

mongo.connect('mongodb://localhost/playground')
.then(()=>console.log('connected to db'))
.catch(err=>console.log('could not connect',err));

//Schema

const courseSchema=new mongo.Schema({
    name:String,
    author:String,
    tags:[String],                              // represents array
    date:{type:Date,default:Date.now},
    isPublished:Boolean
})



// Creating models

const Course=mongo.model('Course',courseSchema);  //creating a class called Course


async function createCourse() {
    
 const course=new Course({                            //creating object course  of class Course 
    name:'Node.js course',
    author:'Amal',
    tags:['node','backend'],
    isPublished:true
 });

 const result=await course.save();
 console.log(result);

}

createCourse();