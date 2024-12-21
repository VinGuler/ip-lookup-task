<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { type IpItem } from '@/types';
import { getCountryByIp } from '@/api';
import CountryFlag from '@/components/ui/CountryFlag.vue';
import CountryTime from '@/components/ui/CountryTime.vue';

const { id, ip, country } = defineProps<IpItem>();
const emit = defineEmits<{
  (e: 'update', value: IpItem): void;
  (e: 'remove', value: string): void;
}>();

const countryTimezone = ref('');
const setTimezone = (timezone: string) => {
  countryTimezone.value = timezone;
};

const isInputValid = ref(false);
const IP_VALIDATION_REGEX = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
const validateIp = (ip: string) => {
  const isValid = IP_VALIDATION_REGEX.test(ip);
  return isValid;
};

const loading = ref(false);
const setLoading = (isLoading: boolean) => (loading.value = isLoading);
const searchCountry = async (newIp: string) => {
  const newCountry = await getCountryByIp(newIp);
  return { country: newCountry.countryCode, timezone: newCountry.timezone };
};

const inputValue = ref('');
const handleInput = async (e: Event) => {
  const newValue = (e.target as HTMLInputElement).value;
  inputValue.value = newValue;
  isInputValid.value = validateIp(newValue);
  if (!isInputValid.value) {
    handleChange({ ip: newValue, country: '' });
    setTimezone('');
    return;
  }

  setLoading(true);
  const { country, timezone } = await searchCountry(newValue);
  setLoading(false);
  if (!country || !timezone) {
    isInputValid.value = false;
    handleChange({ ip: newValue, country: '' });
    setTimezone('');
    return;
  }
  setTimezone(timezone);
  handleChange({ ip: newValue, country });
};
const handleChange = (update: { ip?: string; country?: string }) => {
  const newItem: IpItem = {
    id,
    ip,
    country,
    ...update,
  };
  emit('update', newItem);
};
const handleRemove = () => {
  emit('remove', id);
};
</script>

<template>
  <div class="item">
    <div class="item__container">
      <button @click="handleRemove">
        <i class="em em-wastebasket"></i>
      </button>
      <label>
        <input :disabled="loading" @blur="handleInput" />
      </label>
      <span v-if="loading" class="item__loading-container">loading...</span>
      <template v-else>
        <CountryFlag v-if="country" :country-code="country" />
        <CountryTime v-if="countryTimezone" :timezone="countryTimezone" />
        <span v-if="inputValue && !isInputValid" class="item__error"
          >Input is not a valid IPV4</span
        >
      </template>
    </div>
  </div>
</template>

<style scoped>
.item__container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.item__container input {
  padding: 0.25rem;
}
.item__container button {
  font-size: 0.5rem;
  padding: 0.5rem;
}
.item__loading-container {
  font-size: 0.75rem;
  color: skyblue;
}
.item__error {
  font-size: 0.75rem;
  color: firebrick;
}
</style>
