<script>
	import {
		convertEventForCalendar,
		convertEventForTimeline
	} from '$lib/domain/event.js';
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
	import List from '@event-calendar/list';

	let { children, data } = $props();

	const demoOptionsCalendar = {
		view: 'dayGridMonth',
		headerToolbar: {
			start: 'title',
			center: '',
			end: ''
		},
		events: Object.values(
			data.events
				.map((event) => convertEventForCalendar(event, data.students))
				.reduce((acc, event) => {
					if (!acc[event.resourceId]) {
						acc[event.resourceId] = event;
					}
					return acc;
				}, {})
		),
		locale: 'hr',
		dayCellFormat: { day: '2-digit' },
		eventTimeFormat: () => ''
	};

	const demoOptionsTimeline = {
		view: 'listWeek',
		headerToolbar: {
			start: '',
			center: '',
			end: ''
		},
		events: data.events
			.map((event) => convertEventForTimeline(event, data.students))
			.filter(({ status }) => !status),
		locale: 'hr',
		selectable: true,
		hiddenDays: Array.from(Array(7).keys()).filter(
			(day) => day !== new Date().getDay()
		)
	};
</script>

<aside>
	<div class="calendar--container">
		<Calendar plugins={[DayGrid]} options={demoOptionsCalendar} />
	</div>
	<div class="timeline--container">
		<Calendar plugins={[List]} options={demoOptionsTimeline} />
	</div>
</aside>
{@render children()}

<style>
	.calendar--container {
		height: 100%;
		width: 100%;

		:global {
			.ec-event {
				font-size: 0.4em;
			}
		}
	}

	.timeline--container {
		height: 100%;
		width: 100%;
	}

	aside {
		height: 100%;
		width: 25svw;
	}
</style>
