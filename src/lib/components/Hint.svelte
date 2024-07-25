<script lang="ts">
  export let title;
  export let hint;
</script>

<div class="w-2/3 prose-xl">
  <h1>{title}</h1>
  {@html hint}
</div>