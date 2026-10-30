import { nanoid } from "nanoid";
import type { CreateUrlInput } from "./url.schema.js";
import { createUrlRpository, deleteUrlRpository, getUrlRepository } from "./url.repositories.js";
import type { urlRow } from "../../shared/types/url.type.js";
import { AppError } from "../../shared/error/AppError.js";
import { CacheUrl, getCachedUrl } from "./url-cache.repository.js";

export const createUrl = async(data:CreateUrlInput,userId: string) =>{
 let {originalUrl,alias} = data ;
 if(!alias){
    alias = nanoid(7) ;
 } ;

 const url: urlRow = await createUrlRpository(originalUrl, alias,userId) ;

 return url ;

}

export const getUrl = async(alias: string) =>{
   const cachedUrl = await getCachedUrl(alias) ;
   if(cachedUrl !== null) {
      return {original_url:cachedUrl}
   }

   const url = await getUrlRepository(alias) ;
   if(!url){
      return null ;
   }
   await CacheUrl(alias,url.original_url) ;
   return url ;
}


export const deleteUrl = async(alias: string) =>{
 
 const result = await deleteUrlRpository(alias) ;

 if(!result){
    throw new AppError("Alias not found",404,true)
 }

 return result ;

}