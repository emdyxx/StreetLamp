<template>
    <div class="Refresh"
    v-loading="loading2"
    element-loading-text="拼命加载中">
    </div>
</template>
<script>
export default {
    name: 'Refresh',
    data () {
        return {
            loading2: true
        }
    },
}
</script>
<style scoped>
.Refresh{width: 100%;height: 100%;}
</style>