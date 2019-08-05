<template>
    <div>
        <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>{{index+1}}</td>
                    <td>
                      <b-form-input v-model="item.sn"></b-form-input>
                    </td>
                    <td class="item-table__item">
                      <b-form-input v-model="item.item"></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="item.qty" @input="changeData(index)"></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="item.up" @input="changeData(index)"></b-form-input>
                    </td>
                    <td>
                      <b-form-input v-model="item.tot" disabled></b-form-input>
                    </td>
                  </tr>
                </tbody>
    </div>
</template>
