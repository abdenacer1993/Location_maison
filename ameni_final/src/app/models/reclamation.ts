export class Reclamation {
    public id : number ;
    public nom : string ;
    public email : string ; 
    public message : string ;
   
  
    constructor (  id : number ,
       nom : string , 
      email : string , 
      message : string 
   ){
        this.id = id ;
        this.nom = nom ;
        this.email = email ;
        this.message = message ;
    }
  }
  
  