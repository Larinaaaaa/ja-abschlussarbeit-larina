// Overview.tsx
import './Overview.css'
import { Accordion, AccordionSection, Text, Checkbox } from '@audi/audi-ui-react'
import { useState } from 'react'

const Overview = () => {

    const [tasksCompleted, setTasksCompleted] = useState({
        api: false,
        docs: false,
    })

    const handleCheckboxChange = (taskKey: keyof typeof tasksCompleted) => {
        setTasksCompleted(prev => ({
            ...prev,
            [taskKey]: !prev[taskKey],
        }))
    }

    return (
        <Accordion>
            <AccordionSection
                headingLevel="h2"
                hint="Diese Woche fällig"
                hintSeverity="informative"
                id="section-6__with-role-region"
                roleRegion
                subline="Eine Schnittstelle aufbauen um System 1 und 2 kommunizieren zu lassen"
                label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Checkbox
                            inputId="checkbox-api"
                            checked={tasksCompleted.api}
                            onChange={() => handleCheckboxChange('api')}
                        />
                        <span>API Schnittstelle</span>
                    </div>
                }
            >
                <div className="accordion-content">
                    <Text variant="copy1">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr...
                    </Text>
                </div>
            </AccordionSection>

            <AccordionSection
                headingLevel="h2"
                hint="In 2 Wochen fällig"
                hintSeverity="positive"
                id="section-7__with-role-region"
                roleRegion
                subline="Fortschritte vom Projekt 'Projekt abc' dokumentieren"
                label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Checkbox
                            inputId="checkbox-api"
                            checked={tasksCompleted.api}
                            onChange={() => handleCheckboxChange('api')}
                        />
                        <span>Dokumentation verfassen</span>
                    </div>
                }
            >
                <div className="accordion-content">
                    <Text variant="copy1">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr...
                    </Text>
                </div>
            </AccordionSection>
        </Accordion>
    )
}

export default Overview
