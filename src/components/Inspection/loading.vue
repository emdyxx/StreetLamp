
<template>
    <div class="loading"
    v-loading="loading2"
    element-loading-text="拼命加载中">
    </div>
</template>
<script>
export default {
    name: 'loading',
    data () {
        return {
            loading2: true
        }
    },
}
</script>
<style scoped>
.loading{width: 100%;height: 100%;}
</style>