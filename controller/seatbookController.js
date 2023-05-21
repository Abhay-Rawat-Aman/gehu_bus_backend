const BookSeat= require("../models/bookSeat");

//see the booked seat in bus
exports.seeBookedSeatStudent = async(req,res) =>{
    const bus_details = req.header('bus_id');
    console.log(bus_details);
    const reserve_seat=await BookSeat.find({bus_details});
    let rs = []
    for(let i=0;i<reserve_seat.length;i++)
    {
        rs.push(reserve_seat[i].seat_no);
    }
    return res.status(200).json({
        success:true,
        rs
    })
}

exports.seeBookedSeatConductor = async(req,res) =>{
    const bus_details = req.header('bus_id');
    console.log(bus_details);
    const rs=await BookSeat.find({bus_details});
    let reserve_seat = []
    for(let i=0;i<rs.length;i++)
    {
        const cst = JSON.stringify(rs[i]);
        console.log(cst);
        reserve_seat.push(rs[i]);
    }
    return res.status(200).json({
        success:true,
        reserve_seat
    })
}