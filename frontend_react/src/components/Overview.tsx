import './Overview.css';
import { ContentCard, Table, TableBody, TableCell, TableColumnHeadingCell, TableHeader, TableRow, Text } from '@audi/audi-ui-react';
import { Animals } from '../model/Animals.ts';

interface OverviewProps {
    animals: Animals[];
}

const HeaderRow = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableColumnHeadingCell>
                    <Text as="h2" variant="order2">
                        ID
                    </Text>
                </TableColumnHeadingCell>
                <TableColumnHeadingCell>
                    <Text as="h2" variant="order2">
                        Name
                    </Text>
                </TableColumnHeadingCell>
                <TableColumnHeadingCell>
                    <Text as="h2" variant="order2">
                        Numeric Value
                    </Text>
                </TableColumnHeadingCell>
            </TableRow>
        </TableHeader>
    );
}

const GradeCard = (props: { animals: Animals[] }) => {
    return (
        <ContentCard className="grade-card">
            <Table>
                <HeaderRow/>
                <TableBody>
                    {
                        props.animals.map(animal => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        <Text as="span" variant="copy1">
                                            {animal.id}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text as="span" variant="copy1">
                                            {animal.name}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text as="span" variant="copy1">
                                            {animal.numberOfLegs}
                                        </Text>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </ContentCard>
    );
}


function Overview(props: OverviewProps) {
    return (<GradeCard animals={props.animals}></GradeCard>);
}

export default Overview;