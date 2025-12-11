<mxfile>
  <diagram id="diagram1" name="Page-1">
    <mxGraphModel>
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="client" value="Client" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="40" y="90" width="120" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="api" value="API Gateway" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="220" y="90" width="120" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="db" value="Database" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="400" y="90" width="120" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="edge1" edge="1" parent="1" source="client" target="api">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" edge="1" parent="1" source="api" target="db">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
