<template>
  <div
    v-if="oidcIsAuthenticated"
    class="about"
  >
    <h1>Charlie: This route requires authentication</h1>
    <SignedInUser />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SignedInUser from '@/components/SignedInUser'

export default {
  name: 'Protected',
  components: { SignedInUser },
  computed: {
    ...mapGetters('oidcStore', [
      'oidcIsAuthenticated'
    ])
  }
}
</script>
