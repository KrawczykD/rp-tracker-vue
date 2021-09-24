<template>
    <!-- <div class="d-flex flex-column">
        <div class="w-100">
        <button v-on:click="add(this.singleArray ,0)" class="btn m-2 btn-primary col-1">0 add</button>
        <button v-on:click="add(this.singleArray ,10)" class="btn m-2 btn-primary col-1">10 add</button>
        <button v-on:click="add(this.singleArray ,20)" class="btn m-2 btn-primary col-1">20 add</button>
        <button v-on:click="add(this.singleArray ,30)" class="btn m-2 btn-primary col-1">30 add</button>
        <button v-on:click="add(this.singleArray ,40)" class="btn m-2 btn-primary col-1">40 add</button>
        <button v-on:click="add(this.singleArray ,50)" class="btn m-2 btn-primary col-1">50 add</button>
        <button v-on:click="add(this.singleArray ,60)" class="btn m-2 btn-primary col-1">60 add</button>
        <button v-on:click="add(this.singleArray ,70)" class="btn m-2 btn-primary col-1">70 add</button>
        <button v-on:click="add(this.singleArray ,80)" class="btn m-2 btn-primary col-1">80 add</button>
        <button v-on:click="add(this.singleArray ,90)" class="btn m-2 btn-primary col-1">90 add</button>
        <button v-on:click="add(this.singleArray ,100)" class="btn m-2 btn-primary col-1">100 add</button>
        <button v-on:click="add(this.singleArray ,200)" class="btn m-2 btn-primary col-1">200 add</button>
        <button v-on:click="add(this.singleArray ,300)" class="btn m-2 btn-primary col-1">300 add</button>
        <button v-on:click="addTwo(this.singleArray ,20 , 40)" class="btn m-2 btn-primary col-1">add 20 40</button>
        </div>
    </div> -->
    <div class="row fs-5">
        <ul class="col-6 text-center">
            <li class="list-group-item justify-content-center align-items-center" 
            v-for="(item , index) in multipleArrays" :key="index">{{item[0]}} , {{item[1]}}
              <button v-on:click="remove(this.singleArray ,item[0])" class="btn mx-2 btn-primary"><i class="fa fa-trash"></i></button>
            </li>
        </ul>
    </div>
    

</template>

<script>
export default {
  props: ["points"],
  mounted: function () {
    this.singleArray = this.toSingleArray(this.points)

    this.multipleArrays = this.toMultipleArrays(this.singleArray)
  },

  data:function(){
      return{
          singleArray:[],
          multipleArrays:[]
      }
      
  },

//   watch:{
//       singleArray :function(){
//               this.multipleArrays = this.toMultipleArrays(this.singleArray)
//       }
//   },

  methods: {
    toSingleArray: function (multipleArrays) {
      let connectedArrays = Array.prototype.concat.apply([], multipleArrays);
      let noDuplicatesArray = [...new Set(connectedArrays)];

      return noDuplicatesArray;
    },

    toMultipleArrays: function (singleArray) {
      let multipleArrays = [];

      for (let x = 0; x < singleArray.length - 1; x++) {
        multipleArrays.push([singleArray[x], singleArray[x + 1]]);
      }

      return multipleArrays;
    },

    remove: function (array , number) {
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == number) {
          array.splice(i, 1);
        }
      }
      this.multipleArrays = this.toMultipleArrays(this.singleArray)
    },

    add:function(array,number){
        if(array.findIndex(item => item === number) === -1){
            array.push(number)
            array.sort(function(a, b){return a-b})
        } 
        this.multipleArrays = this.toMultipleArrays(this.singleArray)
    },

    addTwo:function(array,number1,number2){
        if(array.findIndex(item => item === number1) === -1){
            if(array.findIndex(item => item === number2) === -1){
                array.push(number1)
                array.push(number2)
                array.sort(function(a, b){return a-b})
            }

        }

        
        this.multipleArrays = this.toMultipleArrays(this.singleArray)
    },




    getRandomColor:function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
}

  },
};
</script>

<style>
</style>