<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/" exact-active-class="is-selected">Qiita Tag Search</router-link></li>
      </ul>
    </nav>
    <p>キーワード（Qiitaのタグ名）から、最新のQiita記事20件を表示します。</p>
  </header>
</template>

<script>
import axios from "axios";

export default {
  name: 'myHeader'
}
</script>

<style lang="scss" scoped>
header {
  nav {
    margin-left: auto;
    ul {
      display: flex;
      list-style: none;
      li {
        font-size: 13px;
        line-height: 1.2;
        font-weight: bold;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
        a {
          color: #ccc;
          text-decoration: none;
          &.is-selected {
            color: #222;
          }
        }
      }
    }
  }
  p {
    margin-top: 5px;
    color: #999;
    font-size: 10px;
    line-height: 1.2;
  }
}
</style>
