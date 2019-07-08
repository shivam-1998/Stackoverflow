var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Test", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

var postSchema = new mongoose.Schema({
        title: String,
        description: String,
        Answers: [
           {
               Answeredby: String,
               Answerdescription: String,
               answercreatedAt: {type: Date,default:Date.now}     
           }      
        ],
        postCreatedAt:  {type: Date,default:Date.now}
});

var stack = mongoose.model("stack",postSchema);

   var data = new stack({
        title:"javascript",
        description:"what is method"
   });

//    app.get("/form",function(req,res){
//            res.render('form');
//    })

//   app.post("/form",function(req,res){
//           var title = req.body.title;
//           var desc = req.body.description;
//           var data = {
//                   title:title,
//                   description:desc
//                 }
//           console.log(data);
//           stack.create(data,function(error,data){ 
//                   if(error){
//                        console.log("Error!!");
//                   }else{
//                           console.log(data);
//                           res.redirect("/");
//                   }
//         });
//   })     

  

app.get("/",function(req, res){
     res.redirect("dashbord");
});


app.get("/dashbord",function(req, res){
        stack.find({},function(error, blogs){
                if(error){
                        console.log("Error!");
                }else{
                        res.render("dashbord",{blogs: blogs});
                }
        });
});

app.get("/test",function(req,res){
        console.log("hello");
})

app.get("/dashbord/post", function(req,res){
        res.render("post");
    });
    
    app.post("/dashbord", function(req, res){
        var title = req.body.title;
        var desc = req.body.description;
        var data = {
                title:title,
                description:desc
              }
        stack.create(data, function(error, newqes){
            if(error){
                res.render("post");
            }else{
                    console.log(newqes);
                res.redirect("/dashbord");
            }
        });
    });

    app.get("/dashbord/:id",function(req,res){
            
            
            stack.findById(req.params.id, function(error,answer){
                if(error){
                        res.redirect("/dashbord");
                 }else{
                         console.log(answer);
                        res.render("show",{blog:answer}); 
                 }
            })
           
    });

    app.post("/dashbord/:id",function(req,res){
            var data = req.body.stack;
            var id = req.params.id;
             stack.findById(id,function(error,que){
                     if(error){
                          res.render("post"); 
                     }else{
                             console.log(data);     
                         que.Answers.push(data);
                         que.save();
                         res.redirect("/dashbord");    
                     }
             })
    });
    


app.listen(2000,function() {
	console.log("Server has been started");
});
