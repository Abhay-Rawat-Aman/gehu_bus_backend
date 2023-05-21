const Price = require("../models/price");

//add Price - Done by Admin
exports.addPrice = async(req,res) => {
    const node = await Price.create(req.body);
    return res.status(201).json({
        success: true,
        node
    });
}

//price List All access
exports.priceList = async(req,res) =>{
    const node = await Price.find();
    let val=[]
    for(let i=0;i<node.length;i++)
        val.push({city:node[i].location,price:node[i].price});
    return res.status(200).json({
        success:true,
        node,
        val
    });
}

//delete Price - Done by Admin
exports.deletePrice = async(req,res) => {
    const node = await Price.findById(req.params.id);
    if(!node)
    {
        return res.status(500).json({
            success:false,
            message: "Something Error happened !!"
        })
    }
    await Price.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        success:true,
        node
    });
}

//update price - Done by Admin
exports.updatePrice = async(req,res) =>{
    const node = await Price.findById(req.params.id);
    if(!node)
    {
        return res.status(500).json({
            success:false,
            message: "Something Error happened !!"
        })
    }
    const priceUpdate = {};
    const {price,location,dsHostler} = req.body;
    if(price)
        priceUpdate.price=price;
    if(location)
        priceUpdate.location=location;
    if(dsHostler)
        priceUpdate.dsHostler=dsHostler;
    //console.log(priceUpdate);
    const unode = await Price.findByIdAndUpdate(req.params.id,{$set:priceUpdate},{new:true});
    return res.status(200).json({
        success:true,
        unode
    });
}