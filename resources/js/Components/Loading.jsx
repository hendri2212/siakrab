export default function Loading() {
    return (
        <div className="w-fit m-auto">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{
                    margin: "auto",
                    background: "rgb(255, 255, 255)",
                    display: "block",
                    shapeRendering: "auto",
                }}
                width="55px"
                height="55px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle cx="30" cy="50" fill="#00eaff" r="20">
                    <animate
                        attributeName="cx"
                        repeatCount="indefinite"
                        dur="1s"
                        keyTimes="0;0.5;1"
                        values="30;70;30"
                        begin="-0.5s"
                    />
                </circle>
                <circle cx="70" cy="50" fill="#e7e7e7" r="20">
                    <animate
                        attributeName="cx"
                        repeatCount="indefinite"
                        dur="1s"
                        keyTimes="0;0.5;1"
                        values="30;70;30"
                        begin="0s"
                    />
                </circle>
                <circle cx="30" cy="50" fill="#00eaff" r="20">
                    <animate
                        attributeName="cx"
                        repeatCount="indefinite"
                        dur="1s"
                        keyTimes="0;0.5;1"
                        values="30;70;30"
                        begin="-0.5s"
                    />
                    <animate
                        attributeName="fillOpacity"
                        values="0;0;1;1"
                        calcMode="discrete"
                        keyTimes="0;0.499;0.5;1"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    );
}
