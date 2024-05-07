import Card from "../Card";

const Flatlist = ({ data }: any) => {
    return (
        <div className="flex gap-1 p-2">
            {data.map((item: any, index: Number) => (
                <Card key={index} data={item} className="flex-shrink-0"/>
            )
            )}
        </div>
    );
};

export default Flatlist;
