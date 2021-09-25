<template>
  <div class="row fs-5">
    <div class="w-100 text-end">

    <input type="number" name="end" id="" placeholder="value" v-model="value" />
    <input
      type="number"
      name="price"
      id=""
      placeholder="price"
      v-model="price"
    />
    <button v-on:click="add(this.arrayOfPoints, value, price)">add</button>
    </div>
    <ul class="col-6 text-end w-100">
      <li
        class="list-group-item"
        v-for="(item, index) in arrayOfPoints"
        :key="index"
      >
        from: {{ item.start }} , to: {{ item.end }} , £{{ item.price }}
        <button
          v-on:click="remove(this.arrayOfPoints, item.end)"
          class="btn mx-2 btn-primary"
        >
          <i class="fa fa-trash"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["points"],
  mounted: function () {},

  data: function () {
    return {
      arrayOfPoints: this.points,
      price: null,
      value: null,
    };
  },

  methods: {
    add: function (array, value, price) {
      if (this.price !== null && this.value !== null) {
        let foundedIndex = array.findIndex((item) => item.end === value);

        if (foundedIndex === -1) {
          // if value not exist check 
          let foundedHigher = array.findIndex((item) => item.end > value);

          if (foundedHigher !== -1) {
            // if founded higher value check
            if (array[foundedHigher - 1]) {
              // if higher value is not only element in array add before and take start value from previous
              array.splice(foundedHigher, 0, {
                start: array[foundedHigher - 1].end,
                end: value,
                price: price,
              });
            } else {
              // if higher value is only value add before and set start to 0
              array.splice(foundedHigher, 0, {
                start: 0,
                end: value,
                price: price,
              });
            }
          } else if (array[array.length - 1]) {
            // if there is no higher check if there is previous value and add element on the end
            array.push({
              start: array[array.length - 1].end,
              end: value,
              price: price,
            });
          } else {
            // if there is no previous element add element and set start to 0
            array.push({
              start: 0,
              end: value,
              price: price,
            });
          }
          // optimize array 
          this.optimize(array);
        } else {
          // if value exist update it
          this.remove(array, value);
          this.add(array, value, price);
        }
      }
      //set input value to null
      this.price = null;
      this.value = null;
    },

    remove: function (array, value) {
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i].end == value) {
          array.splice(i, 1);
          this.optimize(array);
        }
      }
    },

    optimize: function (array) {
      array.forEach((element, index) => {
        if (array[index + 1]) {
          array[index + 1].start = element.end;
        }
      });
    },
  },
};
</script>

<style>
</style>