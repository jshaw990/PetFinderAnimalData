<template>
  <PageLayout>
    <AggregateData />
  </PageLayout>
</template>

<script>
import AggregateData from '../../components/AggregateData.vue'
import PageLayout from '../../components/AppLayout/PageLayout.vue'

export default {
  name: 'AggregateDataPage',
  components: { AggregateData, PageLayout }
}
</script>
