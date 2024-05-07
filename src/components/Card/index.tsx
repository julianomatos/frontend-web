import icon from './container.png'

const Card = ({ data }: any) => {
    return (
        <div className="bg-white shadow-md rounded-md w-[278px] p-3 flex">
            <div className="w-[40px] pe-1 flex-shrink-0">
                <img src={icon} alt="" />
            </div>
            <div className='flex flex-col '>
                <div className='flex-1'>
                    <h2 className="text-sm font-bold ">{data.LOCAL}</h2>
                    <p className="text-gray-600 mb-2 text-[10px]">{data.ENDERECO}</p>
                </div>
                <div className="pb-1">
                    <div className="flex gap-4 ">
                        <div>
                            <p className="text-gray-600 my-2 text-[10px]">Doações</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-[10px] text-white font-bold py-2 px-4 rounded-lg">
                                {data.DOACOES}
                            </button>
                        </div>
                        <div>
                            <p className="text-gray-600 my-2 text-[10px]">Voluntários</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-[10px] text-white font-bold py-2 px-4 rounded-lg">
                                {data.VOLUNTARIOS}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;