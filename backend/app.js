const express=require('express');
const app=express();
app.use(express.json());
const cors=require('cors');
const {Pool}=require('pg')

app.use(cors())

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'password',
    port:5432,
    database:'student'
});

app.post('/',async(req,res)=>{
    const {fname,lname,regno,phoneNo,email,dob,age,gender,dept,year,address,city,state,country,zip}=req.body;
    try{
        const q= await pool.query('insert into student(FirstName,LastName,RegNo,phoneNo,email,dob,age,gender,dept,year,address,city,state,country,zip) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) returning *',[fname,lname,regno,phoneNo,email,dob,age,gender,dept,year,address,city,state,country,zip]);
        console.log(q.rows);
    }catch(err){
        console.log(err)
    }
    res.json({msg:'success'})
})

app.get('/',async(req,res)=>{
    try{
        const data=await pool.query('select * from student')
        res.json(data.rows)
    }catch(err){
        console.log(err)
    }
})

app.listen(3000,(req,res)=>
    {console.log('Server is listening to port ...');
})