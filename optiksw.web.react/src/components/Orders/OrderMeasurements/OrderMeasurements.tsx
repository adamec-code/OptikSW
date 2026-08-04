import "./OrderMeasurements.css";
import { IOrderEyeMeasurementData } from "../../../interfaces/OrderInterfaces";
import { useEffect } from "react";

interface Props 
{ 
    id: string,
    name: string,
    distanceType: string,
    data: IOrderEyeMeasurementData
}

function renderAngle(canvasId: string, text: string, angle?: number): void
{
    useEffect(() => {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        console.log(canvasId);

        if (!canvas || canvas.getContext("2d") == null)
        {
            return;
        }

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.beginPath();

        ctx.fillStyle = "black";
        ctx.fillText(text, 35, 60);

        ctx.translate(100, 65);
        ctx.rotate((180*Math.PI)/180);
        ctx.arc(0, 0, 50, 0, 1 * Math.PI);
        ctx.stroke();

        // 0
        ctx.fillStyle = "black";
        ctx.rotate((0*Math.PI)/180);
        ctx.fillRect(45, -1, 10, 1);

        // 45
        ctx.fillStyle = "black";
        ctx.rotate((45*Math.PI)/180);
        ctx.fillRect(45, -1, 10, 1);

        // 90
        ctx.fillStyle = "black";
        ctx.rotate((45*Math.PI)/180);
        ctx.fillRect(45, -1, 10, 1);

        // 135
        ctx.fillStyle = "black";
        ctx.rotate((45*Math.PI)/180);
        ctx.fillRect(45, -1, 10, 1);

        // 180
        ctx.fillStyle = "black";
        ctx.rotate((45*Math.PI)/180);
        ctx.fillRect(45, -1, 10, 1);

        if (angle)
        {
            ctx.fillStyle = "red";
            ctx.rotate((angle*Math.PI)/180);
            ctx.fillRect(-50, 0, 50, 1);
        }
    });
}

function OrderMeasurements({id, name, distanceType, data}: Props)
{
    const cssClass: string = distanceType ? "order-measurements " + distanceType : "order-measurements";

    const canvasLeftEyeId = "canvas-left-eye-" + distanceType + "-" + id;
    const canvasRightEyeId = "canvas-right-eye-" + distanceType + "-" + id;

    const rightEye = data?.rightEye;
    const leftEye = data?.leftEye;

    renderAngle(canvasLeftEyeId, "L", leftEye?.angle);
    renderAngle(canvasRightEyeId, "P", rightEye?.angle);

    return (
        <table className={cssClass} cellSpacing="0" cellPadding="0">
            <tbody>
                {distanceType == "distance" ?
                <tr>                    
                    <td colSpan={6}>
                        <canvas id={canvasLeftEyeId} className="canvas-angle" width="175" height="75"></canvas>
                        <canvas id={canvasRightEyeId} className="canvas-angle" width="175" height="75"></canvas>        
                    </td>
                    <td className="order-measurement-other-data">
                        Čočky<br />(úprava)
                    </td>
                    <td  className="order-measurement-other-data">
                        Obroučky<br />(model)
                    </td>
                    <td  className="order-measurement-other-data">
                        Cena
                    </td>
                </tr>
                    : null
                }
                <tr>
                    <th rowSpan={2}>                    
                        <h4>{name}:</h4>
                    </th>
                    <td className="order-measurement-eye">Pravé oko:</td>
                    <td className="order-measurement-value">{rightEye?.sphere ?? ""}</td>
                    <td className="order-measurement-value">{rightEye?.cylinder ?? ""}</td>
                    <td className="order-measurement-value">{rightEye?.angle ?? ""}</td>
                    <td className="order-measurement-pupil-distance">                    
                        {rightEye && rightEye.pupilDistance && <h4>PD {rightEye.pupilDistance}</h4>}
                    </td>
                    <td rowSpan={2} className="order-measurement-layer-data">                  
                        {data && data.layerPrice && <h4>{data.layerPrice} Kč</h4>}
                        {data && data.layer && <div>{data.layer}</div>}
                    </td>
                    <td rowSpan={2} className="order-measurement-other-data">                    
                        {data && data.framesPrice && <h4>{data.framesPrice} Kč</h4>}
                        {data && data.frames && <div>{data && data.frames}</div>}
                    </td>
                    <td rowSpan={2} className="order-measurement-other-data">                   
                        {data && !!data.price && <h4>{data.price} Kč</h4>}
                        {data && !!data.price && <div>Čočky + obroučky</div>}
                    </td>
                </tr>
                <tr>
                    <td className="order-measurement-eye">Levé oko:</td>
                    <td className="order-measurement-value">{leftEye?.sphere ?? ""}</td>
                    <td className="order-measurement-value">{leftEye?.cylinder ?? ""}</td>
                    <td className="order-measurement-value">{leftEye?.angle ?? ""}</td>
                    <td className="order-measurement-pupil-distance">                    
                        {leftEye && leftEye.pupilDistance && <h4>PD {leftEye.pupilDistance}</h4>}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default OrderMeasurements;