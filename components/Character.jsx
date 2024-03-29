import { createContext, useContext, useEffect, useRef, useState } from "react";
import { formatChar } from "../logicController/logic";
import MainStat from "./MainStat";
import { motion } from 'framer-motion'
import { AiOutlineClear } from "react-icons/ai";
const dataContext = createContext();
export const useData = () => {
    return useContext(dataContext)
}

const Character = ({ character }) => {

    const initValue = {
        equip_type: '',
        value: 0
    }

    const [select, setSelect] = useState({
        'FLOWER': [initValue],
        'FEATHER': [initValue],
        'WATCH': [initValue],
        'GOBLET': [initValue],
        'HELMET': [initValue],
    })

    const [overAll, setOverAll] = useState({
        'FLOWER': 0,
        'FEATHER': 0,
        'WATCH': 0,
        'GOBLET': 0,
        'HELMET': 0,
    })

    const [charVal, setCharVal] = useState(0)

    useEffect(() => {
        const sum = Object.values(overAll).reduce((acc, curr) => acc + curr, 0)
        setCharVal(sum)
    }, [overAll])


    // const CharecterRef = useRef();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1, x: '-100vw' }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1, x: '100vw' }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.01 }}

            className="min-w-max"
        >
            <div className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 rounded-t-xl p-2 flex justify-between items-center px-4">
                <h1 className="font-bold text-white text-xl">{formatChar(character.charID)}</h1>
                <div className="flex items-center gap-4">
                    <span className="text-white text-xl font-bold"> {charVal.toString().slice(0, 4)} / 45 </span>
                    {/* <button
                        className="btn self-end btn-ghost p-4 text-white text-lg"
                        onClick={() => { CharecterRef.current.clearAllStat() }}
                    >
                        <AiOutlineClear />
                    </button> */}
                </div>
            </div>
            <div className="bg-white shadow-xl p-4 pt-2 rounded-b-xl">

                <div className="grid auto-cols-fr auto-rows-fr grid-cols-1 mobile:grid-cols-2 md:grid-flow-col gap-6 ">
                    {
                        character.selectedStat.map((atf, idx) => {
                            return (
                                <dataContext.Provider key={idx} value={{ select, setSelect, overAll, setOverAll }}>
                                    <MainStat
                                        atf={atf}
                                    // ref={CharecterRef}
                                    />
                                </dataContext.Provider>
                            )
                        })}
                </div>
            </div>
        </motion.div>
    )
}
export default Character;