/*********************************************************************************************************
 * ENCRYPTER
 * Esta funcion encripta usando Ceaser Cipher basico
 ********************************************************************************************************/
export function encrypter(text,shift){
    let alphabet = '.:,;_-abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ/ ?¿Ñ!|'.split('')
    text = text.split('')
    let list = []
    
    //Se crea un loop para entrar letra por letra a la palabra input
    for(let t = 0;t < text.length;t++){
      //Se crear un loop para entrar a cada letra del alfabeto
      for (let i = 0;i < alphabet.length;i++){
        //Si la letra del input se encuentra en el alphabeto guardar su 3 tercera posicion adelante
        if(text[t] == alphabet[i]){
            list.push(alphabet[i+shift])
        } //end if
      }//end second for
    }//end for
    
    return list.join("")
    
    //end function
    }
    /******************************************************************************************************
     * DECRYPT
     * Basicamente llama a la funcion encrypter a la inversa para descriptar
     *****************************************************************************************************/
   export function decrypt(text,shift){
      return encrypter(text,-shift)
    }
