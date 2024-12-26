import Image from "next/image"

export const BreadCrumb = ({ name }) => {
    return (
        <div>
            <div className="flex items-center gap-[8px] pb-8">
                <Image
                    src="/assets/folder.svg"
                    width={24}
                    height={24}
                    alt="folder"
                />
                <div className="text-gray-300">/</div>
                <div className="tracking-tight">{name}</div>
            </div>
            <div className="hidden lg:flex items-center gap-[16px]">
                <Image
                    src="/assets/icon-title.svg"
                    width={52}
                    height={52}
                    alt="folder"
                />
                <h1 className="text-3xl tracking-tight font-bold">Menus</h1>
            </div>
        </div>
    )
}