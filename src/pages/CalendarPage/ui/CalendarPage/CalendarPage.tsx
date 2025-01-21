import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect } from 'react';
import { useNavigationStore } from 'entities/Navigation';
import { Button } from 'shared/ui';
import { Divider } from 'shared/ui/Divider/Divider';
import s from './CalendarPage.module.scss';

const CalendarPage = () => {
	const { setCurrentService } = useNavigationStore();

	useEffect(() => {
		setCurrentService('/calendar');
	}, [setCurrentService]);

	return (
		<div className={s.CalendarPage}>
			<div className={s.menu}>
				<Button className={s.createButton}>
					Новое событие
				</Button>

			</div>

			<Divider />

			<div className={s.calendar}>
				<FullCalendar
					plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
					initialView={'dayGridMonth'}
					themeSystem="yeti"
					headerToolbar={{
						left: 'prev,today,next',
						center: 'title',
						right: 'timeGridWeek dayGridMonth timeGridDay'
					}}
					nowIndicator={true}
					navLinks={true}
					firstDay={1}
					locale={ruLocale}
					// events={calendarEvents}
				/>
			</div>
		</div>
	);
};

export default CalendarPage;
