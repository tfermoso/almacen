"use strict"
/**
 * @file Aplicación para la gestión de un almacen
 * @author Tomás
 * @version 0.1
 */

 /**
  * @class Almacen respresenta almacen de CDs y DVDs
  * @property {Array} cds Array de objetos tipo CD
  * @prop {Array} dvds Array de objetos tipo DVD
  * @property {number} capacidad capacidad del almacén
  */
class Almacen {
    /**
     * Crea un almacen
     * @param {numbre} capacidad capacidad del almacén
     */
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.cds = [];
        this.dvds = [];
    }
    /**
     * 
     * @param {*} objeto objeto que introducimos en el almacén 
     * @returns {numbre} Valor devuelto: 0 almacen lleno; sino número de unidades introducidas
     */
    introducir(objeto) {
        if (this.capacidad == 0) {
            console.log("almacen lleno")
            return 0;

        }
        if (objeto.unidades <= this.capacidad) {
            if (objeto.tipo == "cd") {
                this.cds.push(objeto)
            } else if (objeto.tipo == "dvd") {
                this.dvds.push(objeto)
            } else {
                return 0;
            }
            this.capacidad = this.capacidad - objeto.unidades;
            return objeto.unidades

        } else {
            if (objeto.tipo == "cd") {
                objeto.unidades = this.capacidad;
                this.capacidad = 0
                this.cds.push(objeto)
            } else if (objeto.tipo == "dvd") {
                objeto.unidades = this.capacidad;
                this.capacidad = 0
                this.dvds.push(objeto)
            } else {
                return 0;
            }
            return objeto.unidades
        }
    }

    buscar(tituloautor) {

        for (let obj of this.cds) {
            if ((tituloautor == obj.titulo) || (tituloautor == obj.autor)) {

                let objDevuelto = {
                    titulo: obj.titulo,
                    autor: obj.autor,
                    unidades: obj.unidades,
                    precio: obj.precio
                };
                return objDevuelto;
            }
        }
        for (let obj of this.dvds) {
            if ((tituloautor == obj.titulo) || (tituloautor == obj.autor)) {

                let objDevuelto = {
                    titulo: obj.titulo,
                    autor: obj.autor,
                    unidades: obj.unidades,
                    precio: obj.precio
                };
                return objDevuelto;
            }
        }
        return null;

    }

    comprar(titulo, dinero) {
        /*
        let objBuscado= this.buscar(titulo);
        if(objBuscado == null){
            return -1;
        }else{
            if(dinero >= objBuscado.precio){
                
                this.capacidad ++;
                return dinero -objBuscado.precio

            }else {
                return -1;
            }
        }*/
        for (let obj of this.cds) {
            if (titulo == obj.titulo) {
                if (dinero >= obj.precio) {
                    this.capacidad++;
                    obj.unidades--;
                    return dinero - obj.precio;

                } else {
                    return -1;
                }
            }
        }
        for (let obj of this.dvds) {
            if (titulo == obj.titulo) {
                if (dinero >= obj.precio) {
                    this.capacidad++;
                    obj.unidades--;
                    return dinero - obj.precio;
                } else {
                    return -1;
                }
            }
        }
        return -1;
    }
}


/**************Empieza el programa******************** */
let fs=require("fs");
let texto=fs.readFileSync("catalogo.json","utf-8");
let catalogo=JSON.parse(texto);



let alm1 = new Almacen(20000);
for(let elemento of catalogo){
    alm1.introducir(elemento)
}

console.log(alm1.comprar("star trek",342))
console.log(alm1.comprar("star trek",342))
console.log(alm1.comprar("star trek",342))
console.log(alm1);
console.log(alm1);
