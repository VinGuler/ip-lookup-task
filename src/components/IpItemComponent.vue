<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { type IpItem } from '@/types';
import { getCountryByIp } from '@/api';
import CountryFlag from '@/components/ui/CountryFlag.vue';
import CountryTime from '@/components/ui/CountryTime.vue';

type InputUpdate = {
  ip?: string;
  country?: string;
  timezone?: string;
};

const props = defineProps<IpItem>();
const emit = defineEmits<{
  (e: 'update', value: IpItem): void;
  (e: 'remove', value: string): void;
}>();

const handleChange = (update: InputUpdate) => {
  setTimezone(update.timezone ?? '');
  const newItem: IpItem = {
    id: props.id,
    ip: props.ip,
    country: props.country,
    ...update,
  };
  emit('update', newItem);
};
const handleRemove = () => {
  emit('remove', props.id);
};

const countryTimezone = ref('');
const setTimezone = (timezone: string) => {
  countryTimezone.value = timezone;
};

const errorMessage = ref('');
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
  const update: InputUpdate = {
    ip: newValue,
    country: '',
    timezone: '',
  };

  errorMessage.value = '';
  if (!validateIp(newValue)) {
    errorMessage.value = 'Input is not a valid IPV4';
    handleChange(update);
    return;
  }

  let countryData = { country: '', timezone: '' };
  setLoading(true);
  try {
    countryData = await searchCountry(newValue);
    update.country = countryData.country ?? '';
    update.timezone = countryData.timezone ?? '';
  } catch (e) {
    errorMessage.value = 'Error fetching country data';
    console.log('Error in searching', e);
  } finally {
    setLoading(false);
  }
  if (!errorMessage.value) {
    if (!countryData.country) {
      errorMessage.value = 'No country data for IP';
    } else if (!countryData.timezone) {
      errorMessage.value = 'No timezone data for IP';
    }
  }

  handleChange(update);
};

const inputElement = ref<HTMLInputElement>();
onMounted(() => {
  nextTick(() => {
    inputElement.value?.focus();
  });
});
</script>

<template>
  <div class="item">
    <div class="item__container">
      <button @click="handleRemove">
        <i class="em em-wastebasket"></i>
      </button>
      <label>
        <input
          ref="inputElement"
          :value="inputValue"
          :disabled="loading"
          @blur="handleInput"
        />
      </label>
      <span v-if="loading" class="item__loading-container">loading...</span>
      <template v-else>
        <CountryFlag v-if="country" :country-code="country" />
        <CountryTime v-if="countryTimezone" :timezone="countryTimezone" />
        <span v-if="inputValue && errorMessage" class="item__error">{{
          errorMessage
        }}</span>
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
