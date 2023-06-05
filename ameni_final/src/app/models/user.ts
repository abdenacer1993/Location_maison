export interface ILocalUser {
  email: string;
  role: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  role: "admin" | "simpleAdmin" | "user";

  password?: string;
  //for medecin only
  gender?: string;
  speciality?: string;
  fax?: number;
  url?: string;
  medecinPackage?: "basic" | "gold" | "platin";

}

export class User {
  public id : number ;
  public nom : string ;
  public prenom : string ; 
  public email : string ; 
  public telephone : number ;
  public password : string ;
  public prof : string ;
  public adresse : string ;
  public role : string ;
  length: number;

  constructor (  id : number ,
     nom : string , 
    prenom : string , 
    email : string , 
    password : string ,
     telephone : number , 
      role : string ,
     
     prof : string  ,
     adresse : string  ){
      this.id = id ;
      this.nom = nom ;
      this.prenom = prenom ;
      this.email = email ;
      this.password = password ;
      this.telephone = telephone ;
      this.role = role ;
      this.prof = prof ;
      this.adresse = adresse;

  }
}

