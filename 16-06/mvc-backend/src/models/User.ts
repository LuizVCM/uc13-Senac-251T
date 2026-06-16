export class User{
    private id?:number;
    private password:string;
    private email:string;
    
    constructor(email:string, password:string, id?:number){
        this.id = id;
        this.email = email;
        this.password = password;
    }

   public getId(): number | undefined {
    return this.id;
   }
   public setId(id:number):void{
    this.id = id
   }
   public getEmail():string{
    return this.email;
   }
   public setEmail(email:string):void{
    this.email = email;
   }
   public getSenha():string{
    return this.password;
   }
   public setSenha(password:string){
    this.password = password;
   }
}