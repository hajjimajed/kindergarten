import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';



const ChildPDF = ({ childrenData }) => (
    <Document>
        <Page>
            <View>
                <Text>Children List</Text>
                <View>
                    {childrenData.map((child, index) => (
                        <View key={index}>
                            <Text>Name: {child.first_name} {child.last_name}</Text>
                            <Text>Parent Name: {child.parent_name}</Text>
                            <Text>Age: {child.age}</Text>
                            <Text>Gender: {child.gender}</Text>
                            <Text>Is Paid: {child.isPaid ? 'Yes' : 'No'}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);


export default ChildPDF;