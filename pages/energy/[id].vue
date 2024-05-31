<template>
  <div v-if="pending" class="flex flex-1 justify-center items-center">
    <LoaderCircle
      class="w-12 h-12 animate-spin text-primary"
      aria-label="Loading..."
    />
  </div>
  <div v-else-if="!device">Something went wrong</div>
  <div v-else class="flex flex-col gap-3">
    <div class="flex gap-3 items-center justify-between flex-wrap">
      <div class="flex">
        <Cpu
          class="h-24 w-24 px-4 border-2 rounded-lg border-dashed text-primary mr-2"
        />
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold line-clamp-2">
              {{ device.name.split("|")[1] || device.name }}
            </h2>
            <span
              class="w-2 h-2 rounded-full inline-block mr-1 sm:hidden"
              :class="{
                'bg-green-500': device.connected,
                'bg-red-500': !device.connected,
              }"
            ></span>
            <div class="sr-only sm:not-sr-only">
              <Badge :variant="device.connected ? 'default' : 'destructive'">
                {{ device.connected ? "Connected" : "Disconnected" }}
              </Badge>
            </div>
          </div>

          <span>
            {{ device.created_at.replace("T", " ") }}
          </span>
          <div class="flex gap-2">
            <Badge
              v-for="(tag, i) in device.tags"
              variant="outline"
              class="line-clamp-1"
            >
              {{ tag }}
            </Badge>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              :class="
                cn(
                  'w-[280px] justify-start text-left font-normal',
                  !dateRange && 'text-muted-foreground'
                )
              "
            >
              <CalendarIcon class="mr-2 h-4 w-4 text-center" />
              {{
                dateRange
                  ? dateRange.start + " - " + dateRange.end
                  : "Select Date Range"
              }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <RangeCalendar
              v-model="dateRange"
              class="w-64"
              :options="{ format: 'yyyy-MM-dd' }"
            />
          </PopoverContent>
        </Popover>

        <div class="grid xl:grid-cols-2 gap-3 grid-cols-1">
          <Select>
            <SelectTrigger>
              <SelectValue :placeholder="IntervalType" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Interval</SelectLabel>
                <SelectItem v-model="IntervalType" value="HOUR">
                  Hour
                </SelectItem>
                <SelectItem v-model="IntervalType" value="DAY">
                  Day
                </SelectItem>
                <SelectItem v-model="IntervalType" value="WEEK">
                  Week
                </SelectItem>
                <SelectItem v-model="IntervalType" value="MONTH">
                  Month
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue :placeholder="agg_type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>agg_type</SelectLabel>
                <SelectItem v-model="agg_type" value="MAX"> Max </SelectItem>
                <SelectItem v-model="agg_type" value="MIN"> Min </SelectItem>
                <SelectItem v-model="agg_type" value="AVG"> Avg </SelectItem>
                <SelectItem v-model="agg_type" value="SUM"> Sum </SelectItem>
                <SelectItem v-model="agg_type" value="COUNT">
                  Count
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button variant="default">Filter</Button>
      </div>
    </div>
    <Separator class="my-4" />

    <TabsContent value="overview" class="space-y-4">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"
              >Total Energy Usaged</CardTitle
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path
                d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">$45,231.89</div>
            <p class="text-xs text-muted-foreground">
              +20.1% from last month
            </p></CardContent
          >
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"
              >Total Energy Usaged</CardTitle
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path
                d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">$45,231.89</div>
            <p class="text-xs text-muted-foreground">
              +20.1% from last month
            </p></CardContent
          >
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"
              >Total Energy Usaged</CardTitle
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path
                d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">$45,231.89</div>
            <p class="text-xs text-muted-foreground">
              +20.1% from last month
            </p></CardContent
          >
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"
              >Total Energy Usaged</CardTitle
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4 text-muted-foreground"
            >
              <path
                d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">$45,231.89</div>
            <p class="text-xs text-muted-foreground">
              +20.1% from last month
            </p></CardContent
          >
        </Card>
      </div>
    </TabsContent>

    <div class="grid xl:grid-cols-2 gap-3 grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>Current</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChartDevice :data="kWhData" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Energy Usaged</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChartDevice :data="kWhData" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cpu, LoaderCircle } from "lucide-vue-next";
import { CalendarIcon } from "lucide-vue-next";
import type { DateRange } from "radix-vue";
import {
  getLocalTimeZone,
  today,
  CalendarDate,
  DateFormatter,
} from "@internationalized/date";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import RangeCalendar from "~/components/ui/range-calendar/RangeCalendar.vue";
import { cn } from "~/lib/utils";

const route = useRoute();

const deviceId = computed(() => route.params.id as string);
const date = new Date().toISOString();
const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const month = new Date().getMonth();
const year = new Date().getFullYear();
const start = new CalendarDate(year, month, 1);
const end = today(getLocalTimeZone());

const IntervalType = ref("HOUR");
const agg_type = ref("MAX");
const dateRange = ref({
  start,
  end,
}) as Ref<DateRange>;

const kWhData = ref<{ ts: string; value: number }[]>([]);

kWhData.value = [
  {
    ts: "2024-05-01T00:00:00Z",
    value: Math.floor(Math.random() * 2000) + 500,
  },
  {
    ts: "2024-05-02T00:00:00Z",
    value: Math.floor(Math.random() * 2000) + 500,
  },
  {
    ts: "2024-05-03T00:00:00Z",
    value: Math.floor(Math.random() * 2000) + 500,
  },
  {
    ts: "2024-05-04T00:00:00Z",
    value: Math.floor(Math.random() * 2000) + 500,
  },
  {
    ts: "2024-05-05T00:00:00Z",
    value: Math.floor(Math.random() * 2000) + 500,
  },
  {
    ts: "2024-05-06T00:00:00Z",
    value: Math.floor(Math.random() * 2000) + 500,
  },
  {
    ts: "2024-05-07T00:00:00Z",
    value: Math.floor(Math.random() * 2000) + 500,
  },
];
const {
  data: device,
  pending,
  error,
} = useAPI<Device>(`/devices/${deviceId.value}`, {
  lazy: true,
});

// const { data, pending } = await useAPI<{ts:string, values:number}[]>(`/telemetry/metrics/values`,{ lazy: true,
//   params: {
//     device_id: deviceId.value,
//     key: "Total kWh",
//     start: "2024-05-01T00:00:00Z",
//     end: "2024-05-31T23:59:59Z",
//     interval_type: "HOUR",
//     interval: 1,
//     agg_type: "MAX"
//   }
// });
</script>
