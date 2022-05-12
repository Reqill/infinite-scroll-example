import React from 'react';
import { FileText } from 'react-feather';

interface Props {
    title: string,
    link?: string | null | undefined,
    refference?: React.LegacyRef<HTMLDivElement> | undefined,
}

const LaunchCard: React.FC<Props> = ({ title, link = null, refference = null }) => {

    return (
        <div
            ref={refference}
            className={`inline-flex justify-between align-middle w-full ${link === null ? "px-6 py-[.875rem]" : "pl-6 pr-3 py-2"} bg-gray-800 rounded-lg`}>
            <h3 className="text-[#F0F0F0] font-medium text-lg my-auto">
                {title}
            </h3>
            {
                link &&
                <a
                    href={link}
                    target="_blank"
                    title="view article"
                    className="p-2 rounded-full group bg-transparent hover:bg-slate-900/30 transition-all">
                    <FileText size={24} className="stroke-[1.5px] stroke-gray-500 group-hover:stroke-gray-300 transition-all " />
                </a>
            }
        </div>
    );
}

export default LaunchCard