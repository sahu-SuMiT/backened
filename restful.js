UPDATE:
GET  /listings/:id/edit -> edit form
PUT /listings/:id       ->Listing.findByIdAndUpdate(id,object,{validation,new})

POSTING;
GET /listings/new   -> new form
POST  /listings     ->new Listing(object)  a.save();

DELETE
DELETE /listings/:id  ->Listing.findByIdAndDelete(id);
