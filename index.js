const express = require('express');
const app=express();
const Joi=require('joi');

app.use(express.json());


const courses=[
	{ id:1,name:'course 1' },
	{ id:2,name:'course 2' },
	{ id:3,name:'course 3' },
]


app.get('/', (req, res) => {
	res.send('New page!!!....');
});

app.get('/api',(req,res)=>{
	res.send(courses);
});


// get by id



app.get('/api/cc/:id',(req,res)=>{
	const course=courses.find(c=>c.id===parseInt(req.params.id));
	if(!course) res.status(404).send('Not found');
	res.send(course);
})

// insert code


app.post('/api/insert',(req,res)=>{

	const {error}=validation(req.body);
	if(error)return res.status(400).send(error.details[0].message);
		
	
	
	const course={
		id:courses.length+1,
		name:req.body.name			// reading name value from body
	};

	courses.push(course);
	res.send(course);
})


//updating code



app.put('/api/update/:id',(req,res)=>{
		
	const course=courses.find(c=>c.id===parseInt(req.params.id));
	if(!course) res.status(404).send('Not found');

	//validating with other function 

	const { error }=validation(req.body);
	if(error)return res.status(400).send(error.details[0].message);

	//updating name

	course.name=req.body.name;
	res.send(course);

})

const port=process.env.port||3000;
app.listen(3000,() => console.log(`Listening to port ${port}`));	

//delete code

app.delete('/api/delete/:id',(req,res)=>{
	const course=courses.find(c=>c.id===parseInt(req.params.id));
	if(!course) res.status(404).send('Not found');
  
	const index=courses.indexOf(course);    // finding course index
	courses.splice(index,1);
	res.send(course);

});



// function for validation


function validation(val){

	//validation conditions 

	const schema={
		name:Joi.string().min(3).required()
	};

	return Joi.validate(val,schema);

	
}